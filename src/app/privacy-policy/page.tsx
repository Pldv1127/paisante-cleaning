export const metadata = {
  title: "Privacy Policy | Paisante Cleaning Services",
  description: "Privacy policy for Paisante Cleaning Services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAF7F2",
      fontFamily: "'DM Sans', sans-serif",
      padding: "60px 24px",
    }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginBottom: "40px",
            color: "#2C4A3E",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          ← Back to Home
        </a>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          color: "#2C4A3E",
          fontSize: "2.2rem",
          marginBottom: "8px",
        }}>
          Privacy Policy
        </h1>
        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "48px" }}>
          Last updated: April 28, 2026
        </p>

        {[
          {
            title: "Who We Are",
            body: `Paisante Cleaning Services is a professional cleaning company serving Pennsylvania and surrounding areas. Our contact details are:\n\nPhone: (267) 495-6269\nEmail: wpaisantecleaning@gmail.com`,
          },
          {
            title: "Information We Collect",
            body: `When you use the contact form on our website, we collect the information you provide, which may include your name, email address, phone number, and a description of your cleaning needs. We do not collect any payment information through this website.`,
          },
          {
            title: "How We Use Your Information",
            body: `We use the information you provide solely to respond to your inquiry and provide you with a quote or information about our services. We do not sell, trade, or otherwise transfer your personal information to third parties.`,
          },
          {
            title: "Google Ads and Analytics",
            body: `Our website uses Google Ads conversion tracking. When you submit a contact form, a conversion event may be recorded with Google to help us understand the effectiveness of our advertising. Google may use cookies to serve ads based on your prior visits to our website. You can opt out of Google's use of cookies by visiting Google's Ad Settings at https://adssettings.google.com.`,
          },
          {
            title: "Cookies",
            body: `Our website may use cookies to improve your experience and support our Google Ads tracking. You can choose to disable cookies through your browser settings. Doing so may affect some functionality of the site.`,
          },
          {
            title: "Data Retention",
            body: `Contact form submissions are stored in our database solely for the purpose of managing your inquiry. If you would like your information removed, please contact us directly and we will delete it promptly.`,
          },
          {
            title: "Third-Party Services",
            body: `We use the following third-party services:\n\n• Resend — to send and receive emails related to your inquiry\n• Supabase — for secure database storage of contact submissions\n• Google Ads — for advertising and conversion tracking`,
          },
          {
            title: "Your Rights",
            body: `You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, please contact us at wpaisantecleaning@gmail.com or by calling (267) 495-6269.`,
          },
          {
            title: "Changes to This Policy",
            body: `We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date at the top.`,
          },
          {
            title: "Contact Us",
            body: `If you have any questions about this privacy policy, please contact us:\n\nPaisante Cleaning Services\nPhone: (267) 495-6269\nEmail: wpaisantecleaning@gmail.com\nServing Pennsylvania and surrounding areas`,
          },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#2C4A3E",
              fontSize: "1.2rem",
              marginBottom: "12px",
            }}>
              {title}
            </h2>
            <p style={{
              color: "#444",
              lineHeight: "1.8",
              whiteSpace: "pre-line",
              fontSize: "0.95rem",
            }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
