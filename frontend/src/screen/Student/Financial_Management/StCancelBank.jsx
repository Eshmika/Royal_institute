import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import  { useState } from 'react';
import './stcancelbank.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Nav from '../NavBar/Nav';


function StCancelBank() {

    const { id } = useParams();
    const [itnumber, setItnumber] = useState();
    const [accountname, setAccountName] = useState();
    const [accountnumber, setAccountnumber] = useState();
    const [bankname, setBankName] = useState();
    const [discription, setDiscription] = useState();
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();
    const [balance, setBalance] = useState();
    const [walletId] = useState('6615e90982b9dffcc59d079b'); // Set the wallet ID here
    const navigator = useNavigate();
  
    useEffect(() => {
      axios.get('http://Localhost:5000/getbank/' + id)
        .then((res) => {
          setItnumber(res.data.itnumber);
          setAccountName(res.data.accountname);
          setAccountnumber(res.data.accountnumber);
          setBankName(res.data.bankname);
          setDiscription(res.data.discription);
          setDate(res.data.date);
          setAmount(res.data.amount);
        })
        .catch((err) => console.error(err));
    }, [id]);
  
    useEffect(() => {
      axios.get(`http://Localhost:5000/getwallet/${walletId}`)
        .then((res) => {
          setBalance(res.data.balance);
        })
        .catch((err) => console.error(err));
    }, [walletId]);
  
    const update = (e) => {
      e.preventDefault();
      axios.put('http://Localhost:5000/updatebank/' + id, { amount: amount })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    }
  
    const updatewallet = (e) => {
      e.preventDefault();
      const updatedAmount = balance - amount;
      axios.put(`http://Localhost:5000/updatewallet/${walletId}`, { balance: updatedAmount })
        .then(res => {
          console.log(res);
          update(e);
        })
        .catch(err => console.error(err));
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Cancel Payment",
        text: "Are you sure you want to cancel the payment?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          updatewallet(e); // Call submit function if result is confirmed
          Swal.fire({
            title: "Payment is Canceled",
            icon: "success",
          });
          handleClick2();
        } else {
          Swal.fire({
            title: "Changes are Canceled",
            icon: "error",
          });
          // Call submit function even if result is canceled
        }
      });
    };
    
    
  
    const handleClick2 = () => {
      toast.loading('Payment is canceling...', {
        style: {
          background: 'black', // Customize the background color
          color: '#ffffff', // Customize the text color
          borderRadius: '10px', // Add border radius
          border: '2px solid #ffffff', // Add border
        },
      });
    
      setTimeout(() => {
        toast.dismiss();
        setTimeout(() => {
          toast.success('Wallet is Updated!', {
            style: {
              background: '#28a745', // Green background color
              color: '#ffffff', // White text color
              borderRadius: '10px', // Rounded corners
              border: '2px solid #ffffff', // White border
            },
            duration: 2000, // Display duration in milliseconds (3 seconds)
            iconTheme: {
              primary: '#ffffff', // White icon color
              secondary: '#28a745', // Green icon color
            },
          });
          setTimeout(() => {
            navigator('/');
          }, 2500); // Wait for 2 seconds after displaying success toast before navigating
        }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
      }, 5000); // Wait for 5 seconds before dismissing loading toast
    };
  
    const handleCancel = () => {
      navigator('/');
    }
    
  return (
    <div>
      <Nav/>
      <div>
      <Toaster/>
     <div className="bodycba">
            <h1 className="cbah1"> <br></br>Edit Payment</h1>

            <div className="containercba">
                <form className="paycba" 
                onSubmit={handleSubmit}
                >
                <h2 className="cbah2"><br></br>Payment Details</h2><br/>

                    <label htmlFor="cname" className="labelcba1">Enter IT Number:</label><br/>
                    <input type="text" name="itnum" placeholder="IT12345678" pattern="^IT\d{8}$" required className="textcba1"  value={itnumber} /><br /><br />

                    <label htmlFor="an" className="labelcba1">Enter Account Name:</label><br/>
                    <input type="text" name="acname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="textcba2"  value={accountname} /> <br /><br />

                    <label htmlFor="an" className="labelcba1">Enter Account Number:</label><br/>
                    <input type="text" name="acnum" placeholder="xxxxxxxxxx" pattern="[0-9]+" required className="textcba3" value={accountnumber} /> <br /><br />

                    <label htmlFor="cno" className="labelcba1">Enter Bank Name:</label><br/>
                    <input type="text" name="bname" placeholder="Enter Bank Name" pattern="[A-Za-z\s]+" required className="textcba4" value={bankname} /><br /><br />

                    <label htmlFor="totalA" className="labelcba1">Enter Description:</label><br/>
                    <input type="text" name="descriptions" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="textcba7" value={discription}/><br /><br />

                    <label htmlFor="tda" className="labelcba1">Enter Date:</label><br/>
                    <input type="date" name="dates" placeholder="(DD/MM/YY)"  required className="textcba5" value={date} /><br /><br />

                    <label htmlFor="totalA" className="labelcba1">Enter Amount:</label><br/>
                    <input type="text" name="amounts" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="textcba6" value={amount} /><br /><br />
                    <br></br>
                    
                    
                    <div className="paycba2">
                      <br/>
                    <label htmlFor="file" className="labelcba8">Upload a file:</label><br />
                    <input type="file" id="file" name="file" className="textcba8"  />
                    </div>
                    <div className="containercba4"> 
                        <button type="submit" name="submit" className="buttoncba3">Save</button>
                        <button type="submit" name="submit" className="buttoncba4" 
                        onClick={handleCancel}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default StCancelBank
