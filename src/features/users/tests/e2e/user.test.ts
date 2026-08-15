import { expect, test } from "@playwright/test";
import { logInTest } from "../../../auth/tests/e2e/support";

test("edit user", async ({ page }) => {
	const password = "password123";

	const newUser = {
		username: "new user",
		email: "newuser@example.com",
		role: "admin",
	};
	const updatedUser = {
		...newUser,
		username: "updated user",
		email: "updateduser@example.com",
	};

	await logInTest(page);

	const mobileMenuButton = page.getByRole("button", {
		name: /open navigation menu/i,
	});
	const usesMobileNavigation = await page.evaluate(
		() => window.matchMedia("(max-width: 767px)").matches,
	);
	if (usesMobileNavigation) {
		await mobileMenuButton.click();
	}

	const usersLink = page.getByRole("link", { name: /users/i });
	await expect(usersLink).toBeVisible();

	await Promise.all([
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/users") &&
				response.status() === 200 &&
				response.request().method() === "GET",
		),
		usersLink.click(),
	]);

	const addUserButton = page.getByRole("button", { name: /add user/i });
	await expect(addUserButton).toBeVisible();
	await addUserButton.click();

	const dialog = page.getByRole("dialog", { name: /add user/i });
	await expect(dialog).toBeVisible();

	await dialog.getByLabel(/Username/i).fill(newUser.username);
	await dialog.getByLabel(/Email/i).fill(newUser.email);
	await dialog.getByLabel(/Role/i).selectOption(newUser.role);
	await dialog.getByLabel(/^Password\s*\*?$/i, { exact: true }).fill(password);
	await dialog.getByLabel(/Confirm Password/i, { exact: true }).fill(password);

	await Promise.all([
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/users") &&
				response.status() === 200 &&
				response.request().method() === "PUT",
		),
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/users") &&
				response.status() === 200 &&
				response.request().method() === "GET",
		),
		dialog.getByRole("button", { name: /add user/i }).click(),
	]);

	await expect(page.getByText(newUser.username)).toBeVisible();
	await expect(page.getByText(newUser.email)).toBeVisible();

	const editUserButton = page.getByRole("button", {
		name: new RegExp(
			`button that show popup for editing ${newUser.username}`,
			"i",
		),
	});
	await expect(editUserButton).toBeVisible();
	await editUserButton.click();

	const updateUserDialog = page.getByRole("dialog", {
		name: new RegExp(`edit ${newUser.username}`, "i"),
	});
	await expect(updateUserDialog).toBeVisible();
	await updateUserDialog.getByLabel(/Username/i).fill(updatedUser.username);
	await updateUserDialog.getByLabel(/Email/i).fill(updatedUser.email);

	await Promise.all([
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/users") &&
				response.status() === 200 &&
				response.request().method() === "PUT",
		),
		updateUserDialog.getByRole("button", { name: /update user/i }).click(),
	]);

	const row = page.getByRole("row", {
		name: new RegExp(`${updatedUser.username} ${updatedUser.email}`, "i"),
	});
	await expect(row).toBeVisible();
	await expect(row.getByText(updatedUser.username)).toBeVisible();
	await expect(row.getByText(updatedUser.email)).toBeVisible();

	const deleteUserButton = page.getByRole("button", {
		name: new RegExp(
			`button that show popup for deleting ${updatedUser.username}`,
			"i",
		),
	});
	await expect(deleteUserButton).toBeVisible();
	await deleteUserButton.click();

	const deleteUserDialog = page.getByRole("dialog", {
		name: new RegExp(`delete ${updatedUser.username}`, "i"),
	});
	await expect(deleteUserDialog).toBeVisible();
	await Promise.all([
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/users") &&
				response.status() === 200 &&
				response.request().method() === "DELETE",
		),
		page.waitForResponse(
			(response) =>
				response.url().includes("/api/v1/users") &&
				response.status() === 200 &&
				response.request().method() === "GET",
		),
		deleteUserDialog
			.getByRole("button", {
				name: /i accept the consequences. delete user./i,
			})
			.click(),
	]);

	const updatedRow = page.getByRole("row", {
		name: new RegExp(`${updatedUser.username} ${updatedUser.email}`, "i"),
	});
	await expect(updatedRow).toHaveCount(0);
});
