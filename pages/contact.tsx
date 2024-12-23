import MainLayout, { getProfile } from "@/components/Layout";

import Account from "../lib/mw/Accounts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import PageTitle from "@/components/Common/PageTitle";

function ContactUs({ info }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(info.email || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [sentMessage, setSentMessage] = useState(false);
  const [successSend, setSuccessSend] = useState(false);

  async function submitMessage() {
    setSentMessage(true);
    try {
      await Account.message.post(false, name, email, subject, message);
      setSuccessSend(true);
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Contact Us - Self Publishing Titans",
        description:
          "Contact us for any queries, feedback or suggestions. We are always happy to help you.",
        keywords:
          "contact us, self publishing titans, self publishing, contact, self publishing contact",
      }}
      Title={<PageTitle title="Contact Us" showBySptButton={false} />}
      Body={
        <>
          <div className="container mx-auto min-h-[60vh] my-6">
            {sentMessage ? (
              successSend ? (
                <div className="text-center">
                  <h1 className="text-3xl font-bold">
                    Thank you for your message!
                  </h1>
                  <p className="text-sm">
                    We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Sending your Message.</h1>
                  <p className="text-sm">Please wait...</p>
                </div>
              )
            ) : (
              <div
                style={{ border: "1px solid #cccccc" }}
                className="transform scale-90 flex flex-col gap-4 pb-8  border-2 border-gray-600 p-4 px-12 rounded-xl"
              >
                <h6 className="font-bold mt-2 text-2xl pb-6">Contact Us</h6>
                <Label>Name</Label>
                <Input
                  className="w-1/2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Label>Email</Label>
                <Input
                  className="w-1/2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label>Subject</Label>
                <Input
                  className="w-1/2"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Label>Message</Label>
                <Textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button className="" onClick={() => submitMessage()}>
                  Submit <SendIcon />
                </Button>
              </div>
            )}
          </div>
        </>
      }
    />
  );
}

// using next auth
export async function getServerSideProps(context) {
  const info = await getProfile(context.req, context.resolvedUrl);
  return info;
}

export default ContactUs;
