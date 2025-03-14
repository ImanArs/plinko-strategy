"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, ChevronRight, Shield, FileText } from "lucide-react";

export default function Settings() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfUse, setShowTermsOfUse] = useState(false);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>

      <div className="space-y-4">
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="ghost"
            onClick={() => setShowPrivacyPolicy(true)}
            className="flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-left hover:bg-gray-700"
          >
            <div className="flex items-center">
              <Shield className="mr-3 h-5 w-5 text-purple-500" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="ghost"
            onClick={() => setShowTermsOfUse(true)}
            className="flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-left hover:bg-gray-700"
          >
            <div className="flex items-center">
              <FileText className="mr-3 h-5 w-5 text-blue-500" />
              <span>Terms of Use</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </Button>
        </motion.div>
      </div>

      {/* Privacy Policy Modal */}
      <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
        <DialogContent className="max-h-[80vh] overflow-y-auto bg-gray-800 text-white sm:max-w-2xl">
          <DialogHeader>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPrivacyPolicy(false)}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-center text-xl">
              Privacy Policy
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">
              Plinko Strategy Privacy Policy
            </h2>
            <p className="text-gray-300">Last updated: March 14, 2025</p>

            <div className="space-y-4 text-gray-300">
              <p>
                Plinko Strategy ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how your
                personal information is collected, used, and disclosed by Plinko
                Strategy.
              </p>

              <h3 className="text-md font-semibold text-white">
                Information We Collect
              </h3>
              <p>
                Our app does not require you to create an account. All
                calculations and data are stored locally on your device using
                localStorage. We do not collect or store your personal
                information on our servers.
              </p>

              <h3 className="text-md font-semibold text-white">
                Local Storage
              </h3>
              <p>
                The app uses localStorage to save your betting calculations and
                preferences. This data remains on your device and is not
                transmitted to us or any third parties.
              </p>

              <h3 className="text-md font-semibold text-white">Analytics</h3>
              <p>
                We may use third-party analytics tools to help us measure
                traffic and usage trends for the app. These tools collect
                information sent by your device, including usage data and app
                performance data. This helps us improve the app's functionality.
              </p>

              <h3 className="text-md font-semibold text-white">
                Changes to This Privacy Policy
              </h3>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>

              <h3 className="text-md font-semibold text-white">Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at support@ballstrategy.com.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Use Modal */}
      <Dialog open={showTermsOfUse} onOpenChange={setShowTermsOfUse}>
        <DialogContent className="max-h-[80vh] overflow-y-auto bg-gray-800 text-white sm:max-w-2xl">
          <DialogHeader>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTermsOfUse(false)}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-center text-xl">
              Terms of Use
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">
              Plinko Strategy Terms of Use
            </h2>
            <p className="text-gray-300">Last updated: March 14, 2025</p>

            <div className="space-y-4 text-gray-300">
              <p>
                Please read these Terms of Use ("Terms") carefully before using
                the Plinko Strategy mobile application.
              </p>

              <h3 className="text-md font-semibold text-white">
                Acceptance of Terms
              </h3>
              <p>
                By accessing or using the Plinko Strategy app, you agree to be
                bound by these Terms. If you disagree with any part of the
                terms, you may not access the app.
              </p>

              <h3 className="text-md font-semibold text-white">Use License</h3>
              <p>
                Plinko Strategy grants you a limited, non-exclusive,
                non-transferable, revocable license to use the app for your
                personal, non-commercial purposes.
              </p>

              <h3 className="text-md font-semibold text-white">Disclaimer</h3>
              <p>
                The information provided by Plinko Strategy is for informational
                and educational purposes only. We do not guarantee any specific
                results from using our betting calculators and strategies.
                Gambling involves risk, and you should never bet more than you
                can afford to lose.
              </p>

              <h3 className="text-md font-semibold text-white">
                Responsible Gambling
              </h3>
              <p>
                We promote responsible gambling. If you believe you may have a
                gambling problem, please seek help from appropriate support
                services.
              </p>

              <h3 className="text-md font-semibold text-white">
                Limitation of Liability
              </h3>
              <p>
                In no event shall Plinko Strategy be liable for any indirect,
                incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the app.
              </p>

              <h3 className="text-md font-semibold text-white">
                Changes to Terms
              </h3>
              <p>
                We reserve the right to modify or replace these Terms at any
                time. It is your responsibility to review these Terms
                periodically for changes.
              </p>

              <h3 className="text-md font-semibold text-white">Contact Us</h3>
              <p>
                If you have any questions about these Terms, please contact us
                at support@ballstrategy.com.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
