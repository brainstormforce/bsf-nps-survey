# NPS Survey

NPS Survey library for collecting Net Promoter Score feedback in the WordPress admin dashboard.

## External Services

This library connects to the following external services:

### Brainstorm Force Metrics Server

- **Service URL:** https://metrics.brainstormforce.com/
- **Purpose:** Survey responses (rating, comment, email, name, plugin slug) are submitted to the Brainstorm Force metrics server for aggregation and analysis.
- **When data is sent:** When a user submits an NPS survey response.
- **Data transmitted:** Rating score, optional comment, optional email address, first name, last name, source identifier, and plugin slug.
