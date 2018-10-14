function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="22D8YC"
          clientSecret="558b6a237f8e92231956058eb3420b7a"
          scope="sleep"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
