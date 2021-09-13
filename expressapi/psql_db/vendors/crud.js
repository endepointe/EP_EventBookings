const db = require('../../psql_db/init');

// before going into production, tokenize all data before saving
// it to the db.


// the event_id will be compared to the event_id that the user is 
// registering for. if the event_id matches the one the user is 
// registering for, they will be prevented from registering again.
// the vendor_id is not a pk becuase the vendor may be registered
// for other events within the same table. I did not dynamically 
// create a table for each event because I do not know how to 
// protect the db froom injection just yet. I did not manually
// create a table for each event because, until we migrate away
// from eventbrite and create an internal event management system,
// the vendor table will remain this way.
const find = async (vendor_id) => {

  try {
    console.log('db/vendors/find: ', vendor_id);
    let res = await db.oneOrNone('select * from vendors where vendor_id = $1', [vendor_id])
    let vendor = await res;
    console.log('found vendor: ', vendor);
    return vendor;
  } catch(err) {
    vendor.error = err.name;
    return vendor;
  }
};

const create = async (vendor_data) => {

  try {
    console.log('db/vendors/create/: ', vendor_data);
    let newVendor = await db.one('insert into vendors(event_id,vendor_id) values($1,$2) returning vendor_id;', [
      vendor_data.event_id,
      vendor_data.vendor_id
    ]);
    newVendor.error = false;
    return newVendor;
  } catch(err) {
    console.error(err); 
    newVendor.error = true;
    return newVendor;
  }
}

module.exports = {
	find: find,
  create: create,
}