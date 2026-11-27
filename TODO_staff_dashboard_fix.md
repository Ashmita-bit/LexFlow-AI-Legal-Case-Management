# Staff Dashboard Fix TODO

## Issue
- Staff login is successful but dashboard is not visible

## Investigation Done
- [x] Verified backend staff login endpoint works correctly
- [x] Confirmed staff user exists in database (username: 'Sonali', password: 'Sonali 123')
- [x] Checked that AA.png background image exists
- [x] Fixed role check from "Staff" to "staff" to match backend response
- [x] Added debugging console logs to StaffDashboard component

## Next Steps
- [ ] Test staff login with debugging enabled
- [ ] Check browser console for any errors
- [ ] Verify localStorage values are set correctly after login
- [ ] Remove debugging logs once issue is resolved

## Files Modified
- frontend/src/components/StaffDashboard.js
  - Changed role check from "Staff" to "staff"
  - Added Link import from react-router-dom
  - Made case cards clickable with Link components
  - Added hover effects and "Click to View Details" indicator
  - Removed debugging console logs
