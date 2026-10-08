# Christ Church Anglican Communion — E-Bulletin Website

This is a realistic, flat/2D church website with:
- Weekly e-bulletin PDF viewer
- Admin login
- Bulletin metadata editor
- PDF upload for the current bulletin
- Announcements editor
- Sunday service-time editor
- Weekly activity editor
- Bulletin archive
- Church contact information

## Deployment
This project is designed for Netlify Functions + Netlify Blobs.

1. Put the project in a GitHub repository.
2. Import the repository into Netlify.
3. Set the environment variable `ADMIN_PASSWORD` in Netlify.
4. Deploy.
5. Open `/admin.html` and sign in with that password.

The first version includes the supplied logo and the supplied 30/08/2026 bulletin as the starter content.

## Important
The admin password is intentionally NOT included in the project. Set your own strong password in Netlify environment variables.
