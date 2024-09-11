<template>
  <main class="privacy">
    <div class="background">
      <h1 class="background__h1 h1">Privacy Policy</h1>
    </div>
    <div class="wrapper">
      <div class="page">
        <div class="page__block">
          <h2 class="page-title h2-smallcaps">Preface</h2>
          <p class="page-text antique">
            At greeklegend.gr, accessible from greeklegend.gr, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by greeklegend.gr and how we use it.
          </p>
          <p class="page-text antique">
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>
          <p class="page-text antique">
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in greeklegend.gr. This policy is
            not applicable to any information collected offline or via channels
            other than this website.
          </p>
        </div>
      </div>

      <div class="page">
        <div class="page__block">
          <h2 class="page-title h2-smallcaps">CONSENT</h2>
          <p class="page-text antique">
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </div>
        <div class="page__block">
          <h2 class="page-title h2-smallcaps">HOW WE USE YOUR INFORMATION</h2>
          <div class="page-text antique">
            We use the information we collect in various ways, including to:
            <ul class="page-list">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you, either directly or through one of our
                partners, including for customer service, to provide you with
                updates and other information relating to the website, and for
                marketing and promotional purposes
              </li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
          </div>
        </div>
        <div class="page__block">
          <h2 class="page-title h2-smallcaps">LOG FILES</h2>
          <p class="page-text antique">
            Greek Legend follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services' analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users' movement on the website, and gathering
            demographic information.
          </p>
        </div>
        <div class="page__block">
          <h2 class="page-title h2-smallcaps">COOKIES ON THIS WEBSITE</h2>
          <p class="page-text antique">
            Data saved for the aforementioned technical reasons may be analyzed
            for statistical purposes, although the individual user will remain
            anonymous.
          </p>
          <p class="page-text antique">
            * Cookies that are regularly deleted at the end of a session are not
            listed here.
          </p>
        </div>
        <div class="page__block">
          <h2 class="page-title h2-smallcaps">GOOGLE ANALYTICS</h2>
          <p class="page-text antique">
            Google Analytics is used on our website. The integration and
            functioning of this service is explained below. Information stored
            by Google Analytics cookies includes e.g. the time when the website
            was visited, the frequency of the respective website visits and the
            access path to the site. To determine this, Google first captures
            the IP address of the user. However, on our website, IP
            anonymization is activated. As a result, within member states of the
            European Union or other contracting states to the Agreement on the
            European Economic Area, your IP address will be truncated by Google
            prior to transmission to the United States; e.g. by deleting the
            last octet of IPv4 On our behalf, Google will use the
            above-mentioned information to evaluate your use of the website, to
            compile reports on website activity and to provide other services
            related to website activity and internet usage to the website
            operator. The IP address transmitted by your browser as part of
            Google Analytics will not be merged with other Google data. Google
            is also certified in the EU-US Privacy Shield, so that an
            appropriate level of data protection is established for your data in
            the USA. You can prevent Google Analytics from using cookies by
            selecting the appropriate settings in your browser (“Private Mode”,
            found under Settings on most browsers). It should be noted once
            again, however, that you may not be able to make full use of all
            functions of this website in this case. In addition, you may prevent
            the collecting of the data generated by the cookie in relation to
            the use of the website (including your IP address) as well as the
            processing of this data by Google with a download and installation
            of the browser plug-in available at the following link:
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              title="tools.google.com"
            >
              tools.google.com</a
            >
            <br />
            Additional information on data protection in relation to Google
            Analytics can be found directly on Google.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useHeaderStateStore } from "@/stores/headerState";
const headerStateStore = useHeaderStateStore();
onMounted(() => {
  headerStateStore.changeLogoShow(true);
  headerStateStore.changeColorToWhite(true);
  headerStateStore.changeCanHeaderChange(false);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
