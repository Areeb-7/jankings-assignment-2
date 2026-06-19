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

public class BookingE2ETest extends BaseTest {

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
            e.printStackTrace();
            return false;
        }
    }

    @Test
    public void testBookingE2E() {
        // 1. Create a user and log in first (checkout requires login token)
        String email = "bookinguser+" + System.currentTimeMillis() + "@example.com";
        String password = "Password123";
        createUserViaApi("BookingCustomer", email, password);

        LoginPage loginPage = new LoginPage(driver, frontendUrl);
        loginPage.open();
        loginPage.login(email, password);

        // Wait to login and redirect
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        wait.until(ExpectedConditions.urlToBe(frontendUrl + "/"));

        // 2. Ensure a spa provider exists in DB via API
        createProviderViaApi("E2E_Spa", "Pro", "9999999999", "spa", "New York", 600.0);

        // 3. Open spa listing page directly
        driver.get(frontendUrl + "/service-providers/spa");

        ServiceProviderPage providerPage = new ServiceProviderPage(driver);
        providerPage.waitForPageToLoad("spa");
        Assert.assertTrue(providerPage.hasProviders(), "Should have at least one spa provider registered");
        providerPage.clickFirstProvider();

        // 4. Fill multi-step booking form
        BookingFormPage bookingPage = new BookingFormPage(driver);
        bookingPage.waitForPageToLoad();

        bookingPage.enterPhoneNumber("1234567890");
        bookingPage.clickContinue(); // to step 2

        bookingPage.enterAddress("123 Street", "Mumbai", "Maharashtra", "400001");
        bookingPage.clickContinue(); // to step 3

        bookingPage.selectSlot("Morning"); // to step 4

        bookingPage.selectFirstAvailableDateAndTime(); // to step 5 (Checkout)

        Assert.assertTrue(bookingPage.isSummaryDisplayed(), "Checkout summary step should be displayed");

        bookingPage.clickPay();

        // 5. Verify booking redirection back to home
        boolean navigatedHome = wait.until(ExpectedConditions.urlToBe(frontendUrl + "/"));
        Assert.assertTrue(navigatedHome, "After successful booking, user should be redirected back to the homepage");
    }
}
