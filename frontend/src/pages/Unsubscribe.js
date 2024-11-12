import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmailForm from '../components/AddEmailForm';

function Unsubscribe() {
    
    const [submittedMessage, setSubmittedMessage] = useState(false);

    const addEmail = async (email) => {
        try {
            const response = await axios.delete('http://127.0.0.1:5000/delete_user/', email);
            setSubmittedMessage(true);
          } catch (error) {
            console.error("Error adding user", error);
          }
        }

    return (
        <div className="card">{!submittedMessage ? 
        <AddEmailForm 
            title="Unsubscribe from emails" 
            buttonName="Unsubscribe"
            addEmail={addEmail}
        /> : <div>Unsubscribed!</div>}</div>
    );
}