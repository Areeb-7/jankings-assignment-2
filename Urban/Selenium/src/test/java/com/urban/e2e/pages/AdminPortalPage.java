package com.urban.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AdminPortalPage {
    private final WebDriver driver;
    private final String baseUrl;
    private final WebDriverWait wait;

    public AdminPortalPage(WebDriver driver, String baseUrl) {
        this.driver = driver;
        this.baseUrl = baseUrl;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void open() {
        driver.get(baseUrl);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//h2[text()='Admin Profile']")));
    }

    public void registerProvider(String firstName, String lastName, String mobile, String service, String location, String rate) {
        WebElement firstEl = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//label[text()='First Name']/following-sibling::input")
        ));
        com.urban.e2e.BaseTest.typeSlowly(firstEl, firstName);
        com.urban.e2e.BaseTest.delay(300);

        WebElement lastEl = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//label[text()='Last Name']/following-sibling::input")
        ));
        com.urban.e2e.BaseTest.typeSlowly(lastEl, lastName);
        com.urban.e2e.BaseTest.delay(300);

        WebElement mobEl = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//label[text()='Mobile Number']/following-sibling::input")
        ));
        com.urban.e2e.BaseTest.typeSlowly(mobEl, mobile);
        com.urban.e2e.BaseTest.delay(300);

        WebElement serviceDropdown = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//label[text()='Service']/following-sibling::select")
        ));
        Select select = new Select(serviceDropdown);
        select.selectByValue(service.toLowerCase());
        com.urban.e2e.BaseTest.delay(500);

        WebElement locEl = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//label[text()='Location']/following-sibling::div/input")
        ));
        com.urban.e2e.BaseTest.typeSlowly(locEl, location);
        com.urban.e2e.BaseTest.delay(300);

        WebElement rateEl = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//label[contains(text(), 'Amount per Hour')]/following-sibling::div/input")
        ));
        com.urban.e2e.BaseTest.typeSlowly(rateEl, rate);
        com.urban.e2e.BaseTest.delay(500);

        WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[@type='submit']")
        ));
        submitBtn.click();
        com.urban.e2e.BaseTest.delay(1000);
    }
}
