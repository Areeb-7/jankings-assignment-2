package com.urban.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginPage {
    private final WebDriver driver;
    private final String urlPath = "/login";
    private final String baseUrl;
    private final WebDriverWait wait;

    public LoginPage(WebDriver driver, String baseUrl) {
        this.driver = driver;
        this.baseUrl = baseUrl;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void open() {
        driver.get(baseUrl + urlPath);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
    }

    public void login(String email, String password) {
        WebElement emailEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        WebElement passEl = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("password")));
        
        com.urban.e2e.BaseTest.typeSlowly(emailEl, email);
        com.urban.e2e.BaseTest.delay(500);
        
        com.urban.e2e.BaseTest.typeSlowly(passEl, password);
        com.urban.e2e.BaseTest.delay(500);
        
        WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[type='submit']")));
        submitBtn.click();
        com.urban.e2e.BaseTest.delay(1000);
    }
}
