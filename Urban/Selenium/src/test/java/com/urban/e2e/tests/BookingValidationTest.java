package com.urban.e2e.tests;

import com.urban.e2e.BaseTest;
import com.urban.e2e.pages.LoginPage;
import com.urban.e2e.pages.ServiceProviderPage;
import com.urban.e2e.pages.BookingFormPage;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;

public class BookingValidationTest extends BaseTest {

    private boolean createProviderViaApi(String firstName, String lastName, String mobile, String service, String location, double rate) {
        try {
            URL url = new URL(backendUrl + "/api/service-providers/post");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);
            String payload = String.format(
                "{\"firstName\":\"%s\",\"lastName\":\"%s\",\"mobileNumber\":\"%s\",\"service\":\"%s\",\"location\":\"%s\",\"amountPerHour\":%f}",
                firstName, lastName, mobile, service, location, rate
            );
            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.getBytes());
            }
            return conn.getResponseCode() >= 200 && conn.getResponseCode() < 300;
        } catch (Exception e) {
            return false;
        }
    }

    @Test
    public void testBookingFormValidation() {
        // 1. Login user
        String email = "validationuser+" + System.currentTimeMillis() + "@example.com";
        String password = "Password123";
        createUserViaApi("ValidationCustomer", email, password);

        LoginPage loginPage = new LoginPage(driver, frontendUrl);
        loginPage.open();
        loginPage.login(email, password);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        wait.until(ExpectedConditions.urlToBe(frontendUrl + "/"));

        // 2. Seed provider
        createProviderViaApi("E2E_SpaVal", "Pro", "9999999999", "spa", "New York", 600.0);

        // 3. Go to booking form
        driver.get(frontendUrl + "/service-providers/spa");
        ServiceProviderPage providerPage = new ServiceProviderPage(driver);
        providerPage.waitForPageToLoad("spa");
        providerPage.clickFirstProvider();

        BookingFormPage bookingPage = new BookingFormPage(driver);
        bookingPage.waitForPageToLoad();

        // 4. Try submitting empty phone number
        bookingPage.enterPhoneNumber("");
        bookingPage.clickContinue();

        String errorMsg = bookingPage.getValidationErrorText();
        Assert.assertTrue(errorMsg.contains("Phone number is required"),
                "Validation message should be displayed for missing phone number");

        // 5. Try submitting invalid phone number format
        bookingPage.enterPhoneNumber("1234");
        bookingPage.clickContinue();

        errorMsg = bookingPage.getValidationErrorText();
        Assert.assertTrue(errorMsg.contains("Please enter a valid 10-digit phone number"),
                "Validation message should be displayed for invalid phone number format");
    }
}
