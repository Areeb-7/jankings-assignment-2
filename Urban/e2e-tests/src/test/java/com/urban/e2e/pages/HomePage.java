package com.urban.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class HomePage {
    private final WebDriver driver;
    private final String baseUrl;
    private final WebDriverWait wait;

    public HomePage(WebDriver driver, String baseUrl) {
        this.driver = driver;
        this.baseUrl = baseUrl;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void open() {
        driver.get(baseUrl + "/");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className("brand-name")));
    }

    public void selectService(String serviceName) {
        // Find the service card text and click it
        WebElement serviceCard = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//h3[translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='" + serviceName.toLowerCase() + "']")
        ));
        serviceCard.click();
    }
}
