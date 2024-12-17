import { useEffect } from "react";
import MainTemplate, {
  getProfile,
} from "../../../components/MainPage/MainPage";
import { useRouter } from "next/router";
import { Account } from "../../../lib/mw";
import loadScript from "../../../components/utils/loadScript";

function loadJSAsync(url) {
  const spiffy = document.createElement("script");
  spiffy.src = url;
  spiffy.async = true;
  document.body.appendChild(spiffy);
}

function Donate({ info }) {
  const router = useRouter();

  useEffect(() => {
    if (info !== false) {
      loadScript(`
      "use strict";!function(i,t){var f=t.spiffy=t.spiffy||[];if(!f.init){
if(f.invoked)return void(t.console&&console.error&&console.warn("Spiffy Elements included twice."))
;f.invoked=!0,f.methods=["identify","config","debug","off","on"],f.factory=function(i){
return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(i),f.push(t),f}},
f.methods.forEach(function(i){spiffy[i]=f.factory(i)}),f.load=function(t,f){if(!spiffy.ACCOUNT){
spiffy.ACCOUNT=t,spiffy.DOMAIN=f;var e=i.createElement("script");e.type="text/javascript",
e.async=true,e.crossorigin="anonymous",e.src="https://js.static.spiffy.co/spiffy.js?a="+t
;document.body.appendChild(e)}}}}(document,window),
spiffy.SNIPPET_VERSION="1.1.0";
spiffy.config({
    hideSummary: true,
})
spiffy.load("selfpublishingtitans");
      
      
      `);
    } else {
      router.push("/auth/login?next=/courses/buy/donate");
    }
  }, []);
  return (
    <MainTemplate
      info={info}
      body={
        <>
          <div className="min-h-screen mt-8">
            <div
              dangerouslySetInnerHTML={{
                __html: `

                    <spiffy-checkout url="https://selfpublishingtitans.spiffy.co/checkout/free-kdp-course" ></spiffy-checkout>
                `,
              }}
            />
          </div>
        </>
      }
    />
  );
}

// using next auth
export async function getServerSideProps(context) {
  // context.res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=5900, stale-if-error=5900"
  // );
  const content = await Account.content.home();
  const info = await getProfile(context, {
    pageData: content.simple,
  });

  return info;
}

export default Donate;
