package com.urban.e2e.tests;

import com.urban.e2e.BaseTest;
import com.urban.e2e.pages.HomePage;
import com.urban.e2e.pages.ServiceProviderPage;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class ServiceNavigationTest extends BaseTest {

    @Test
    public void testServiceNavigation() {
        HomePage homePage = new HomePage(driver, frontendUrl);
        homePage.open();
        
        homePage.selectService("spa");

        ServiceProviderPage providerPage = new ServiceProviderPage(driver);
        providerPage.waitForPageToLoad("spa");

        Assert.assertTrue(driver.getCurrentUrl().contains("/service-providers/spa"),
                "User should be navigated to the service providers listing page for spa");
    }
}
