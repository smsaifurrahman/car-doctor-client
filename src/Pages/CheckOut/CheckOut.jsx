/** @format */

import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const CheckOut = () => {
    const service = useLoaderData(AuthContext);
    const { title, _id ,price,img} = service;
    const {user} = useContext(AuthContext)

    const handleBookService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email, //short if both value is same
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId) {
                alert('service is booked')
            }
        })
    
    }
    return (
        <div>
            <h2 className="text-center text-3xl">Book service: {title} </h2>
            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                <form onSubmit={handleBookService} className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                placeholder="Name"
                                name="name"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                defaultValue={user?.email}
                                name="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input
                                type="text"
                                 defaultValue={ '$'+ price}
                                className="input input-bordered"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary btn-block">
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;
