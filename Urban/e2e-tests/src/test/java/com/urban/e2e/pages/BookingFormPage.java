package com.urban.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class BookingFormPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    public BookingFormPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void waitForPageToLoad() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//h1[text()='Book Your Service']")));
    }

    // Step 1: Phone
    public void enterPhoneNumber(String phone) {
        WebElement phoneEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("phoneNumber")));
        com.urban.e2e.BaseTest.typeSlowly(phoneEl, phone);
        com.urban.e2e.BaseTest.delay(500);
    }

    public void clickContinue() {
        WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[type='submit']")));
        submitBtn.click();
        com.urban.e2e.BaseTest.delay(1000);
    }

    public String getValidationErrorText() {
        WebElement errorEl = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//p[contains(@class, 'text-red-600')]")));
        return errorEl.getText();
    }

    // Step 2: Address
    public void enterAddress(String street, String city, String state, String zipCode) {
        WebElement streetEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("area")));
        com.urban.e2e.BaseTest.typeSlowly(streetEl, street);
        com.urban.e2e.BaseTest.delay(300);

        WebElement cityEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("city")));
        com.urban.e2e.BaseTest.typeSlowly(cityEl, city);
        com.urban.e2e.BaseTest.delay(300);

        WebElement stateEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("state")));
        com.urban.e2e.BaseTest.typeSlowly(stateEl, state);
        com.urban.e2e.BaseTest.delay(300);

        WebElement zipEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("zipCode")));
        com.urban.e2e.BaseTest.typeSlowly(zipEl, zipCode);
        com.urban.e2e.BaseTest.delay(500);
    }

    // Step 3: Slot
    public void selectSlot(String slotLabel) {
        WebElement slotBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//div[contains(@class, 'labe') and contains(text(), '" + slotLabel + "')]/ancestor::button")
        ));
        slotBtn.click();
        com.urban.e2e.BaseTest.delay(1000);
    }

    // Step 4: Date & Time
    public void selectFirstAvailableDateAndTime() {
        // Click the first date button in the grid
        WebElement firstDate = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//h3[contains(text(), 'Select Date')]/following-sibling::div/button[1]")
        ));
        firstDate.click();
        com.urban.e2e.BaseTest.delay(500);

        // Click the first time slot button in the grid
        WebElement firstTime = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//h3[contains(text(), 'Select Time')]/following-sibling::div/button[1]")
        ));
        firstTime.click();
        com.urban.e2e.BaseTest.delay(500);

        // Click the Continue button
        WebElement continueBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[text()='Continue']")
        ));
        continueBtn.click();
        com.urban.e2e.BaseTest.delay(1000);
    }

    // Step 5: Checkout Summary
    public boolean isSummaryDisplayed() {
        WebElement summaryHeader = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h3[text()='Booking Summary']")
        ));
        com.urban.e2e.BaseTest.delay(500);
        return summaryHeader.isDisplayed();
    }

    public void clickPay() {
        WebElement payBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(), 'Pay')]")
        ));
        payBtn.click();
        com.urban.e2e.BaseTest.delay(2000);
    }
}
