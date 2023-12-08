import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ['/', '/register', '/api/webhook', '/api/clerkWebhook(.*)', '/api/sounds', '/api/sounds/correct_answer.mp3'],
    ignoredRoutes: ['/public/sounds']

});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 