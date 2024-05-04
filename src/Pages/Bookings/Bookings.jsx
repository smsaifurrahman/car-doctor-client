/** @format */

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
   const { user } = useContext(AuthContext);
   const [bookings, setBookings] = useState([]);

   const url = `http://localhost:5000/bookings?email=${user?.email}`;
   useEffect(() => {
      axios.get(url,{withCredentials:true})
      .then(res => {
         setBookings(res.data);
      })
      // fetch(url)
      //    .then((res) => res.json())
      //    .then((data) => setBookings(data));
   }, [url]);

   const handleDelete = (id) => {
      const proceed = confirm("Are you sure you want to delete it");
      if (proceed) {
         fetch(`http://localhost:5000/bookings/${id}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.deletedCount > 0) {
                  alert("deleted Successful");
                  const remaining  = bookings.filter(booking => booking._id !== id);
                  setBookings(remaining)
               }
            });
      }
   };

   const handleBookingConfirm = id => {
    fetch(`http://localhost:5000/bookings/${id}` ,{
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'confirm'})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount > 0) {
            // update state
            const remaining = bookings.filter(booking => booking._id !== id);
            const updated = bookings.find(booking => booking._id === id);
             console.log(updated);
             updated.status = 'confirm';
            const newBookings= [updated, ...remaining];
            setBookings(newBookings);
        }
    })
   }
   return (
      <div>
         <h2 className="text-3xl text-center"> Your Bookings </h2>
         bookings length: {bookings.length}
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>
                        <label>
                           <input type="checkbox" className="checkbox" />
                        </label>
                     </th>
                     <th>Image</th>
                     <th>Service</th>
                     <th>Date</th>
                     <th>Price</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {bookings.map((booking) => (
                     <BookingRow
                        booking={booking}
                        handleDelete={handleDelete}
                        handleBookingConfirm={handleBookingConfirm}
                        key={booking._id}
                     ></BookingRow>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Bookings;
