// @ts-nocheck
import Imap from "imap";
import { simpleParser } from "mailparser";
import "dotenv/config";

const imapConfig = {
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASSWORD,
  host: process.env.IMAP_HOST,
  port: 993,
  tls: true,
};

const handleMessage = (msg, emailAddress) => {
  return new Promise((resolve, reject) => {
    let bodyBuffer = [];
    msg.on("body", (stream) => {
      stream.on("data", (chunk) => {
        bodyBuffer.push(chunk);
      });

      stream.on("end", () => {
        const body = Buffer.concat(bodyBuffer).toString();
        simpleParser(body, (err, email) => {
          if (err) {
            reject(err);
            return;
          }

          const mailAddress = email.to.value[0]?.address;
          if (mailAddress === emailAddress) {
            const codeMatch = email.text?.replace(/\s+/g, "").match(/\b\d{6}\b/g);
            resolve(codeMatch ? codeMatch[0] : null);
          } else {
            resolve(null);
          }
        });
      });
    });
  });
};

const getVerificationCode = (emailAddress) => {
  const imap = new Imap(imapConfig);
  function openInbox(callback) {
    imap.openBox("INBOX", false, callback);
  }
  return new Promise((resolve, reject) => {
    let fetchInterval = null;
    let timeout = null;

    const cleanUp = () => {
      if (fetchInterval) clearInterval(fetchInterval);
      if (timeout) clearTimeout(timeout);
      if (imap) imap.end();
    };

    imap.once("ready", () => {
      openInbox((err) => {
        if (err) {
          cleanUp();
          reject(err);
          return;
        }

        console.log("INBOX opened");

        fetchInterval = setInterval(() => {
          imap.search(["ALL"], (err, results) => {
            if (err) {
              cleanUp();
              reject(err);
              return;
            }

            if (results.length === 0) {
              console.log("No emails found.");
              return;
            }

            const f = imap.fetch(results, { bodies: "", struct: true });

            f.on("message", (msg) => {
              handleMessage(msg, emailAddress)
                .then((code) => {
                  if (code) {
                    cleanUp();
                    console.log("Verification code found:", code);
                    resolve(code);
                  }
                })
                .catch((error) => {
                  console.error("Error processing message:", error);
                });
            });

            f.once("error", (error) => {
              console.error("Fetch error:", error);
            });

            f.once("end", () => {
              console.log("Done fetching emails.");
            });
          });
        }, 5000);

        timeout = setTimeout(() => {
          console.log("Timeout occurred; no verification code found.");
          cleanUp();
          resolve(null);
        }, 60000); // 2 minutes timeout
      });
    });

    imap.once("error", (err) => {
      cleanUp();
      reject(err);
    });

    imap.once("end", () => {
      console.log("IMAP connection ended");
    });

    imap.connect();
  });
};

export { getVerificationCode };
