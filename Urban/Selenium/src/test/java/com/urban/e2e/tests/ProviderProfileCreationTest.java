package com.urban.e2e.tests;

import com.urban.e2e.BaseTest;
import com.urban.e2e.pages.AdminPortalPage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class ProviderProfileCreationTest extends BaseTest {

    @Test
    public void testProviderProfileCreation() {
        String pUrl = System.getProperty("provider.url");
        String providerPortalUrl = (pUrl == null || pUrl.trim().isEmpty()) ? "http://localhost:5175" : pUrl;

        AdminPortalPage adminPage = new AdminPortalPage(driver, providerPortalUrl);
        adminPage.open();

        String rand = String.valueOf(System.currentTimeMillis()).substring(7);
        String firstName = "Provider" + rand;
        String lastName = "Test";
        String mobile = "98" + rand + "01"; // Ensures a 10 digit number
        if (mobile.length() < 10) {
            mobile = "9876543210";
        } else if (mobile.length() > 10) {
            mobile = mobile.substring(0, 10);
        }

        adminPage.registerProvider(firstName, lastName, mobile, "painting", "Boston", "850");

        // Wait for the success alert to display in the UI
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        WebElement successAlert = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("successMessage")));
        
        Assert.assertTrue(successAlert.isDisplayed(), "Success message should be displayed after registering a provider");
        Assert.assertTrue(successAlert.getText().contains("registered successfully"), "Success text should confirm registration");
    }
}
