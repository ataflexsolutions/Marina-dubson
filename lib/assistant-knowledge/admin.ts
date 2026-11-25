export const ADMIN_GUIDE = String.raw`
# Admin & Staff Guide (Marina Dubson Stenographic Services portal)

## Roles and what each can see
The admin portal sidebar is grouped into Operations, Finance, Personnel Registry, Content and System. What you see depends on your role:
- Admin: everything. Dashboard, Calendar, Bookings, Documents, Website Inquiries, Jobs, Invoices, Reports, Team, User Accounts, Private Clients, Agency Clients, Reporters, Messages, Blogs, Campaigns, Services, Settings.
- Manager: Dashboard, Calendar, Bookings, Documents, Website Inquiries, Jobs, Invoices, Reports, Team, Messages, Blogs. No User Accounts, client/reporter registries, Campaigns, Services or Settings.
- Staff: Dashboard, Calendar, Bookings, Documents, Website Inquiries, Jobs, Messages. Staff members sign in to the Staff Portal (see the end of this guide).
- Reporter: Dashboard, Calendar, Bookings, Jobs, Team, Messages, Settings (their own view).
If a menu item is missing, your role does not have access; ask an Admin.

## Dashboard
Overview of recent bookings and platform status. Bookings show statuses such as Pending Review (newly submitted), Accepted, Confirmed, Completed and Cancelled; items that need you are flagged "Action needed". Quick Actions include New Booking and Export (downloads a quick data pull).

## Calendar
Monthly view of all scheduled engagements, color-coded by status (Submitted, Pending, Accepted, Confirmed, Completed). It warns "Conflict: multiple accepted bookings" when two accepted jobs overlap a day.
To create a booking for a client: click Schedule Booking, select a date, then choose the client, service, Proceeding Type / Case Name, Date, Time, Appearance Type (remote or in-person), Location / Venue (address or Zoom link) and any Special Requirements, then click Confirm Booking.

## Bookings (the booking registry)
Filter tabs at the top:
- Full Matrix: every booking.
- Requires Review: newly submitted requests waiting for approval.
- Active Operations: accepted bookings.
- Reporter Availability: list of reporters to see who is available.
You can search by case or client. Unopened bookings are highlighted until you open them.

How to review and approve a new booking:
1. Open the Requires Review tab.
2. Click Approve on the booking, check the details (ID, type, client), then click Confirm & Approve.

How to assign a reporter:
1. Click Assign on the booking row. The Direct Assignment window opens.
2. Pick a reporter from the list, or click Assign to Myself.
3. To change it later, click the reporter name to reassign, or click Unassign. Assignment is locked once a booking is Completed.

How to post a booking to the reporter marketplace: on an unassigned booking click Publish (click Unpublish to pull it back). Reporters can then claim it from the Jobs area.

How to complete a job and bill the client:
1. Click Complete & Bill on the booking (not available for Completed, Cancelled or Declined bookings).
2. If the client listed special add-on requests, an "Operational Add-On Signal" pop-up shows them. Click Accept & Bill to carry them into the invoice notes, or Ignore.
3. In the Finalize & Bill window enter Page Count, original and additional copies (Orig, Addl. Copies), Extra Cert copies, Turnaround Scale (from Immediate to standard), Wait Time (Hrs), Afterhours (Hrs), Location/Travel ($), and toggle add-ons: Rough Draft, Videography, Interpreter, Expert Witness, CART Services, Read & Sign, Mini Transcript, Index, Paper Delivery (+$150), Pre-billed Review (+$1/pg), On-Record Bust ($500 min). Rates are pre-filled from the client's rate template (Standard or Private Client); you can use Manual Dollar Overrides if needed.
4. Submit. The booking becomes Completed and an invoice is created; click View Final Invoice (or View Invoice on the row later).
Click the arrow on a row to open the full booking detail page (Back to Registry returns to the list).

## Jobs (marketplace)
Shows Total Jobs, Active Jobs, Market Live (jobs published for claims) and Pending Intake.
- Post a new job: click New Job, choose the contact (Select Contact), service, proceeding type, remote or in-person, venue/address, date and time, optional Staff Notes and the payable Locked Page Rate and Locked Appearance for the reporter, then click Deploy Job.
- Publish / Unpublish puts a job on or off the marketplace.
- View Claims shows reporters who said "Reporter Interested". Click Accept to give them the job or Decline. "No claims received yet" means nobody has claimed it.
- Assign Job to Myself takes a job directly. Edit Job, then Save Changes, updates details.
Whether reporters can see claim counts is controlled in Settings, Policies.

## Invoices (Finance)
Two sections:
- Client Matrix: client invoices. Statuses include Draft, Pending, Overdue and Settled. Search by invoice ID or client, and use Export to download.
- Reporter Matrix: payout offers to reporters (Pending, Accepted, Declined).

Invoice a client: client invoices are created automatically when you use Complete & Bill on a booking. Open an invoice to see the line items (pages, copies, appearance fee, minimum fee, add-ons, expedite, wait time, after-hours, cancellation or late payment fees). On the invoice page you can:
- Edit Invoice, change amounts, then Save Overrides (or Cancel Edit).
- Settle Invoice to mark it paid.
- Print, or copy the Payment Link to send the client.

Pay a reporter (payout offer):
1. In Invoices, open Reporter Matrix and click Generate Payout Offer.
2. Select the booking and reporter (Select Operative), enter Pages, Page Rate ($), Appearance ($), Min Fee ($) and any notes, then click Transmit Offer.
3. The reporter accepts or declines it in their portal. Open an offer to view its timeline, edit it (Save Offer) and add Admin Notes.

## Reports
Reports & Analytics shows Total Bookings, Revenue Collected, Outstanding Balance, Active Clients, Cancellation Rate, Monthly Revenue (last 6 months, collected vs. outstanding), Booking Status Breakdown, Bill Status Breakdown and top clients by revenue paid. Choose a period (This Month, Last Month, All Time, etc.) and download Bookings CSV or Full Report CSV.
There is also an Analytics page (revenue, bookings and performance overview with a Generate Intelligence Report button) reachable from within the portal.

## Team
Internal staff and task management.
- Add a team member: click New Operative / Create Team Member, enter name, email, phone, department (Operations, Finance, Legal, Sales, Client Relations, Management), position and a login password (minimum 6 characters), then Confirm Induction. The member uses that password to sign in.
- Assign a task: choose Assign / Deploy Tasking, pick the person (Select Personnel), enter an Objective Title, Briefing Details, priority (LOW, MEDIUM, HIGH, URGENT) and a due date, then Authorize Assignment. Tasks appear in the staff member's portal.

## User Accounts (Admin only)
Create any login: click Create Account, fill First Name, Last Name, Email, Company, choose the Role (Client, Agency, Reporter, Staff, Manager, Admin) and, for clients, the Client Type (Private Client or Agency Client). Leave the password blank to auto-generate one, or set a temporary password. Search the directory by name or email.

## Private Clients and Agency Clients (Admin only)
Lists of clients by type. Click New Client to create a client profile plus a portal login (First Name, Last Name, Email, Phone, Company optional, Password optional, auto-generated if blank).
Open a client to see their profile. Click Edit Profile & Pricing to change details, then Commit Changes.

Set client-specific pricing:
1. Open the client and click Edit Profile & Pricing.
2. Turn the custom pricing toggle to ACTIVE (custom rates only apply when it is ACTIVE).
3. Under Service Pricing Matrix, add an override: choose the service, then enter Page Rate ($), Remote ($), In-Person ($), Min Fee ($) and optional Pricing Protocol Notes, then click Commit Override.
4. You can also set a Locked Page Rate and Locked Appearance for the client. Delete an override with the trash icon.

Block a client (stop new bookings): in Edit Profile & Pricing, use Protocol Blacklist ("Deny further booking clearance"), set it to ACTIVE and enter a reason. You can also set a Client Reliability Rating. The client page also has an Internal Staff Ledger for internal tasks (New Objective, Save Objective).

## Reporters (Admin only)
Vet and manage court reporters. Filter by All, Pending, Approved, Rejected. Actions on each reporter: Approve (or Approve now), Reject / Block, and Remove. Remove erases the account if possible, or blocks it if it has linked records.

Deactivating users: the portal has no separate "deactivate" button. For reporters use Reject / Block or Remove; for clients use Protocol Blacklist.

## Messages
Internal messaging with clients and reporters. Use Find Clients & Reporters / Load Contacts to start a conversation, then type and Send. You can attach files, insert links, record voice notes, use emoji, Generate Video Link for a call, Copy Chat Log, and delete messages.

## Documents
Document Archive for portal files. Click Upload New Document, choose a category (General Document, Rate Sheet, Contract, Invoice, Transcript, Résumé (public site)), optionally attach it to a booking, select the file (PDF, DOC, DOCX or TXT only) and click Upload. Filter by booking or category, search by filename, Download, or Reset filters.
To update the résumé shown on the public website, upload a new file under the Résumé (public site) category; the most recently uploaded one is what visitors see.

## Website Inquiries
Messages sent through the public website contact form. Filter by status and update each inquiry to New, Responded or Archived as you handle it.

## Campaigns (Admin only)
Email outreach. Create a campaign with a Campaign Name (Internal), Subject Line and message, choose the audience (Clients, Reporters, Teams or All of Them), review recipients, then Launch / Broadcast Campaign. The list shows reach, opens and click performance.

## Blogs (Admin and Manager)
Click New Article. Enter the title, Short Excerpt, body (rich-text editor with headings, lists, links, quotes, alignment and more), Cover Image or Cover Video, and SEO fields Meta Title (50 to 60 characters) and Meta Description (120 to 160 characters). An SEO Score checklist helps. Set visibility to Draft or Published and click Publish Article (or Update Article when editing). Use Find Article to search.
A Content library page (Upload File) also exists for general media files.

## Services and Add-ons (Admin only)
Services: the catalog of service types. Click Add Service and set the service name and category, Base Page Rate ($), Remote Presence Fee ($), On-Site Attendance ($), Real-time Stream Sync ($) and description, then Save Changes. You can mark a service Active or Offline and Save as Reusable Template (see Templates). These rates feed the pricing clients see when booking.
Add-ons and expedite tiers are managed in Settings, Add-Ons tab: add a label (for example Rough Draft) and a unique value, optional description; edit or Remove existing ones.

## Settings (Admin)
Tabs: Root Identity (public company name, contact email, phone, address, professional name; Update Root Profile), Security (includes Emergency Off-Grid, Enable Lockdown, which temporarily disables all external connections to secure the system), Network Grid, Core Engine (system status), Policies, Notifications, Add-Ons.
Policies tab (click Save Policy Updates after changes):
- Cancellation Policy text shown to clients.
- Financial Responsibility, Private (default 30 days) and Agency (default 45 days).
- Payment Terms: 30, 45 or Custom Agreement, plus Payment Terms Description shown in the client portal.
- Automatically apply late payment interest: off by default; monthly rate defaults to 1.5% when enabled.
- Record and display marketplace claim counts: when off, reporters cannot see claim totals.

## Compliance Center
Tabs: Overview, Data Requests, Data Retention, Security Incidents, Access Audit. Covers NY SHIELD Act and GDPR.
Data deletion and other privacy requests: the Data Requests tab lists each request with its type (Right to Access, Right to Erasure, Right to Rectification, Right to Data Portability, Right to Restrict Processing), the requester's name and email, date, status, and days remaining to respond. All requests should be handled within 30 days; the Overview shows "Action Required" while any are pending. The screen tracks requests; carrying out an erasure (for example removing a reporter or blocking a client) is done in the relevant section. Other tabs: Data Retention policies, Report Incident for security incidents, Search Logs in Access Audit, and Export Compliance Reports (access audit, data requests, retention, security incidents).

## Booking and fee rules (as built)
- Booking lifecycle: Submitted (Pending Review), then Accepted when an admin approves, Confirmed when the client confirms the terms, then Completed. Bookings can also be Cancelled or Declined.
- Cancellation deadline: 3:00 PM on the previous business day before the proceeding (weekends are skipped, so a Monday job's deadline is Friday 3:00 PM). Cancelling before the deadline is free.
- Late cancellation fees for private clients: $300 if cancelled between 3:00 PM and 6:00 PM on the previous business day; $400 after 6:00 PM through the day of the job.
- Late cancellation fees for agency clients: $400 for arbitration/hearings, hearings and realtime proceedings; $300 for other proceedings.
- A late cancellation automatically creates a cancellation invoice due in 14 days, and the booking is marked Cancelled.
- Pricing order: rates start from the service's catalog rates; Private Client tier rates apply to private-tier clients; then, if the client's custom pricing is ACTIVE, their per-service overrides (page rate, remote and in-person appearance, realtime, minimum fee) take priority. Arbitration/hearing and realtime jobs have an appearance fee of at least $300. Private-tier jobs have no congestion fee. The total is never below the applicable minimum fee.
- Turnaround/expedite is charged as a percentage of the page rate on a sliding scale from Immediate (125%) down to standard 10-business-day turnaround.
- Payment terms default to 30 days for private clients and 45 days for agencies (changeable in Settings).

## Staff Portal (Staff role)
Staff sign in and land on the Staff Portal (Operations Center). There they can:
- See their assigned tasks (Active Directives Table) with priority, target date and status, filter objectives, and click Complete when a task is done. "All objectives clear for now" means nothing is pending.
- Send a request to the admin team via Admin Support Protocol: describe the issue or credential/resource request and click Send Request ("Admin team notified" confirms it).
- Update their avatar and sign out (Mission Exit).
Staff accounts are created by an Admin in User Accounts (role Staff) or Team (Create Team Member); tasks are assigned from Team.
`
