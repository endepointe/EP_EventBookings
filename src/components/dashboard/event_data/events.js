// an event id will match a live event. currently, this must be manually
// entered because eventbrite has deprecated the event description
// property. The fix will take place during the creation of an 
// internal-use event management application.
// Each csv in the content represents a paragraph in the event description.
// The paragraphs must be separated for easier interface creation.

const events = [
  {
    id: '167122091675',
    content: [
      "This event is Free to attend, everyone is welcome to support local veteran entrepreneurs, shop quality goods and services.",
      "This event will showcase 30 of the best veteran, military & spouse-owned businesses under one roof.",
      "Jewelry | Woodworking | Health & Wellness | Home Improvement | Apparel | Food |Luxury Fragrances | Roasted to Order Coffee and More",
      "Get your tickets to Engage, Support, Grow... Free and open to the public.",
      "You don't have to be a Veteran to support Veteran Businesses. Get your FREE ticket to support the local veteran-owned businesses. Bring your family and share this event with a friend.",
    ],
  },
  {
    id: '167392835477',
    content: [
      'paragragh 1',
      'paragragh 2',
    ],
  },
]


/*
Sponsor Vendor - $9000 (Open to any organization Must Have Significant Military Discount or Program to be considered )
    •    Logo on all promotions day of the event
    •    Recognized as Sponsor
    •    Company logo linked online event page
    •    Reserved Vendor table at event Premium Location
    •    Podium time at event 3 - 3 min speaking Spots

Vendor Disqualifying Items ( Vendors CAN NOT sell the following items)
No CBD
Weapons of any type 
Alcohol, Tobacco, Vaping Products
Counterfeit Logo Products, Fake Designer Products, Sports Teams 
All vendor space sales are final. No refunds for any reason which include cancellation, inclement weather, or any other reason. In case of inclement weather, the event will be rescheduled.  
All vendors must provide proof of veteran status (Military ID, DD 214, etc.). Please email us at veteransgrowamerica@gmail.com with any questions. We look forward to hearing from you!
*/

module.exports = {events: events};