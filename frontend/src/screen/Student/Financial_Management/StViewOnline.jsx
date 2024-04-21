import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './stviewonline.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function StViewOnline() {
  const [payments, setPayments] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    axios.get('http://Localhost:5000/displayonline')
      .then((res) => {
        // Filter payments to only include the ones with IT number 'IT12345678'
        const filteredPayments = res.data.filter(payment => payment.itnumber === 'IT12345678');
        setPayments(filteredPayments);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://Localhost:5000/deletepayment/' + id)
      .then((res) => {
        // Handle success if needed
      })
      .catch((err) => console.error(err));
  }

  const handleSubmit = (id) => {
    Swal.fire({
      title: "Delete Payment",
      text: "Are you sure you want to delete the Payment Record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // Call handleDelete function with payment ID
        Swal.fire({
          title: "Payment is Deleted",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Changes are Canceled",
          icon: "error",
        });
      }
    });
  };

  const handleClick2 = () => {
    toast.loading('Payment is Deleting...', {
      style: {
        background: 'black',
        color: '#ffffff',
        borderRadius: '10px',
        border: '2px solid #ffffff',
      },
    });

    setTimeout(() => {
      toast.dismiss();
      setTimeout(() => {
        toast.success('Payment is Deleted!', {
          style: {
            background: '#28a745',
            color: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #ffffff',
          },
          duration: 2000,
          iconTheme: {
            primary: '#ffffff',
            secondary: '#28a745',
          },
        });
        setTimeout(() => {
          navigator('/payment');
        }, 2500);
      }, 2500);
    }, 5000);
  };

  return (
    <div>
      <Head />
      <Toaster />
      <div className='bodyvo'>
        <h1 className='h1vo'><br />My Payments</h1>
        <button type="submit" name="online" className="buttonvo1">Online</button> <br />
        <Link to={'/viewbank'} >
          <button type="submit" name="bank" className="buttonvo2">Bank</button>
        </Link>
        <br />
        <Link to={'/viewcash'} >
          <button type="submit" name="cash" className="buttonvo3">Cash</button>
        </Link>
        <br />
        <div className="tbl-headervo">
          <table className='tablevo'>
            <thead>
              <tr>
                <th className='thvo'>Transactions ID</th>
                <th className='thvo1'>Card Name</th>
                <th className='thvo'>Card Number</th>
                <th className='thvo2'>Security Code</th>
                <th className='thvo3'>Expire Date</th>
                <th className='thvo'>Description</th>
                <th className='thvo'>Date</th>
                <th className='thvo'>Amount</th>
                <th className='thvo'>Status</th>
                <th className='thvo'>Action</th>
                <th className='thvo'></th>
                <th className='thvo'></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvo">
          <table className='tablevo'>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className='tdvo'>{payment.itnumber}</td>
                  <td className='tdvo1'>{payment.cardname}</td>
                  <td className='tdvo'>{payment.cardnumber}</td>
                  <td className='tdvo2'>{payment.securitycode}</td>
                  <td className='tdvo3'>{payment.expiredate}</td>
                  <td className='tdvo'>{payment.discription}</td>
                  <td className='tdvo4'>{payment.date}</td>
                  <td className='tdvo5'>{payment.amount}</td>
                  <td className='tdvo' style={{ color: payment.status === 'Approved' ? 'green' : payment.status === 'Rejected' ? 'red' : payment.status === 'Pending' ? 'blue' : 'inherit' }}>{payment.status}</td>
                  <td className='tdvo'>
                    {payment.status !== 'Approved' && payment.status !== 'Rejected' ? (
                      <Link to={`/cancelonline/${payment._id}`} >
                        <input className="buttonvo4" type="button" name="cancel" value="Cancel" />
                      </Link>
                    ) : (
                      <input className="buttonvo7" type="button" name="cancel" value="Cancel" disabled />
                    )}
                  </td>
                  <td className='tdvo'>
                    <Link to={`/editonline/${payment._id}`} >
                      <input className="buttonvo5" type="button" name="edit" value="Edit" />
                    </Link>
                  </td>
                  <td className='tdvo'>
                    <input className="buttonvo6" type="button" name="delete" value="Delete" onClick={() => handleSubmit(payment._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StViewOnline;
