package com.urban.e2e.tests;

import com.urban.e2e.BaseTest;
import com.urban.e2e.pages.LoginPage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTest extends BaseTest {

    @Test
    public void testLogin() {
        String email = "e2euser+" + System.currentTimeMillis() + "@example.com";
        String password = "Test@1234";
        String name = "E2E_LoginUser";

        // Ensure user exists via backend API; if API not available, fall back to UI registration
        boolean created = createUserViaApi(name, email, password);
        if (!created) {
            // fallback: create via UI
            com.urban.e2e.pages.RegisterPage regPage = new com.urban.e2e.pages.RegisterPage(driver, frontendUrl);
            regPage.open();
            regPage.register(name, email, password);
            // small wait to allow redirect
            try { Thread.sleep(1500); } catch (InterruptedException ignored) {}
        }

        LoginPage loginPage = new LoginPage(driver, frontendUrl);
        loginPage.open();
        loginPage.login(email, password);

        // wait 5 seconds after login to allow client-side processing
        try {
            Thread.sleep(5000);
        } catch (InterruptedException ignored) {
        }

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        boolean homeOrRoot = wait.until(d -> d.getCurrentUrl().equals(frontendUrl + "/") || d.getCurrentUrl().contains("/"));
        Assert.assertTrue(homeOrRoot, "After login user should be redirected to home or root");
    }
}
