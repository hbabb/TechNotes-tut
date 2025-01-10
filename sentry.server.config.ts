// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://4e57f189eaa1a6cf199e600588e0b3ef@o4508247102783488.ingest.us.sentry.io/4508376550342656",

	// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
	tracesSampleRate: 0.2,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
});
