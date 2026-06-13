package com.urban.e2e.tests;

import com.urban.e2e.BaseTest;
import com.urban.e2e.pages.RegisterPage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class RegisterTest extends BaseTest {

    @Test
    public void testRegister() {
        String email = "testuser+" + System.currentTimeMillis() + "@example.com";
        String username = "E2E_User";
        String password = "Test@1234";

        RegisterPage page = new RegisterPage(driver, frontendUrl);
        page.open();
        page.register(username, email, password);

        // Wait for navigation to login page
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        boolean loginVisible = wait.until(d -> d.getCurrentUrl().contains("/login") || d.findElements(org.openqa.selenium.By.id("email")).size() > 0);
        Assert.assertTrue(loginVisible, "After registration user should be redirected to login page");
    }
}
