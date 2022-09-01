import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

function configureEnv() {
  console.log('Configuring environment...');
  dotenv.config()
}

async function getInvoice(page) {
  console.log('Getting invoice...');
  const url = 'https://www.saneago.com.br/agencia-virtual/#/'
  await page.goto(url, { waitUntil: 'networkidle2' });

  const selectorButtonIssueDuplicate = '[href="#/2a_via"]'
  const buttonIssueDuplicat = await page.$(selectorButtonIssueDuplicate)
  await buttonIssueDuplicat.click()
  await page.waitForTimeout(5000)

  const selectorButtonLogin = '[href="./Login.jsp"]'
  const buttonLogin = await page.$(selectorButtonLogin);
  console.log(buttonLogin)
  await buttonLogin.click();
  await page.waitForTimeout(1500)

  const selectorInputAccount = '#conta'
  const selectorInputPassword = '#senha'
  const selectorButtonSubmit = '#btnConfirma'
  const account = process.env.SANEAGO_ACCOUNT
  const password = process.env.SANEAGO_PASSWORD
  await page.type(selectorInputAccount, account);
  await page.type(selectorInputPassword, password);
  await page.click(selectorButtonSubmit);
  await page.waitForTimeout(5000)
}

async function getPageAndBrowser() {
  console.log('Getting page and browser...');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  return { page, browser };
}

(async () => {
  console.log('Starting...');
  configureEnv()
  const { page, browser } = await getPageAndBrowser()
  await getInvoice(page)
  await browser.close()
  console.log('Finished')
})()


