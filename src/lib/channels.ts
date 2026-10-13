/**
 * Where people log from. The email address is the live inbound route
 * (prodlog-api workers/email-ingest, Cloudflare Email Routing on the `in.`
 * subdomain); the apex prodlog.app MX belongs to Google Workspace and does
 * not reach Prodlog. The sender is matched to the account by its email.
 */
export const EMAIL_LOG_ADDRESS = 'addlog@in.prodlog.app';
export const SLACK_INSTALL_URL = 'https://api.prodlog.app/api/slack/install';

/**
 * The MCP server (prodlog-api src/routes/mcp.routes.ts): streamable HTTP,
 * OAuth through Prodlog sign-in, no token to paste. The guide's path is
 * linked from the dashboard's Settings and banner, so keep it stable.
 */
export const MCP_SERVER_URL = 'https://api.prodlog.app/mcp';
export const MCP_GUIDE_PATH = '/integrations/mcp';
