export const CONST = {
  SELECTORS: {
    CREATE_ACCOUNT_BUTTON: 'button[type="button"]',
    MAIL_INPUT: 'input[autocomplete="username"]',
    SUBMIT_BUTTON: 'button[type="submit"]',
    CODE_INPUT: 'input[name="otp"]',

    FIRSTNAME_INPUT: 'input[name="first_name"]',
    LASTNAME_INPUT: 'input[name="last_name"]',
    MALE_SEX_RADIO: 'input[value="2"]',
    FEMALE_SEX_RADIO: 'input[value="1"]',
    BIRTDAY_INPUT: 'input[name="birthday"]',

    PASSWORD_INPUT: 'input[name="password"]',
    PASSWORD_CONFIRM_INPUT: 'input[name="password_confirm"]',

    CONFIRM_CHECKBOX: 'label[for="confirm-checkbox"]',
    SUCCESS_REGISTER: 'a[data-id="ph-menu-login"]',
    PAGE_LOADED: "a.ph-menu__logo-link",

    OUATH_CHECKBOX: "#oauth_terms",
    OUATH_SUBMIT_BUTTON: ".oauth_form_button",

    REAUTH_LOGIN: 'input[name="login"]',
    REAUTH_PASSWORD: 'input[type="password"]',
    REAUTH_SUBMIT: 'button[type="submit"]',

    NOTIFICATIONS: ".notifications",
  },

  ANSWERS: {
    SUBMIT_BUTTON: 'input[type="submit"]',
    TEST_SUCCESS: 'img[src="https://wf.cdn.gmru.net/static/wf.mail.ru/img/main/items/booster_02.png"]',
    PHONE: [
      'label[for="1_2"]',
      'label[for="3_7"]',
      'label[for="9_26"]',
      'label[for="6_17"]',
      'label[for="4_9"]',
      'label[for="10_29"]',
      'label[for="2_5"]',
      'label[for="7_18"]',
      'label[for="5_14"]',
      'label[for="8_21"]',
    ],
    SECURITY: [
      'label[for="63_184"]',
      'label[for="64_187"]',
      'label[for="74_217"]',
      'label[for="72_213"]',
      'label[for="66_194"]',
      'label[for="70_209"]',
      'label[for="61_177"]',
      'label[for="68_202"]',
      'label[for="69_207"]',
      'label[for="65_190"]',
      'label[for="71_211"]',
      'label[for="73_215"]',
      'label[for="62_180"]',
      'label[for="75_220"]',
      'label[for="62_180"]',
      'label[for="67_199"]',
    ],
  },

  URLS: {
    PROFILE: "https://profile.vkplay.ru/profile/",
    SECURITY_TEST: "https://ru.warface.com/security_testing",
    PHONE_TEST: "https://ru.warface.com/phone_testing",
    WARFACE: "https://ru.warface.com/profile",
    WARFACE_AUTH:
      "https://account.vkplay.ru/oauth2/?redirect_uri=https%3A%2F%2Fru.warface.com%2Fdynamic%2Fauth%2F%3Fo2%3D1&client_id=ru.warface.com&response_type=code&signup_method=email%2Cphone&signup_social=mailru%2Cvk%2Cg%2Cok%2Ctwitch&lang=ru_RU",
  },
};
