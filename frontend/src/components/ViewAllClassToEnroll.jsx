import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewAllClassToEnroll() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/classes')
      .then((response) => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching classes:', error);
        setLoading(false);
      });
  }, []);

  const handleEnrollClick = (classId) => {
    // Handle enroll logic here
    console.log('Enrolling in class:', classId);
  };

  return (
    <div>
      <h5>All Classes</h5>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {classes.length > 0 ? (
            <ul>
              {classes.map((classItem) => (
                <li key={classItem._id}>
                  <div>
                    <h3>{classItem.name}</h3>
                    <button onClick={() => handleEnrollClick(classItem._id)}>Enroll</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No classes available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewAllClassToEnroll;
