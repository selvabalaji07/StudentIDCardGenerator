export const FormValidationData=(formData)=>{
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required and should not be empty.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = 'Name should only contain alphabets and spaces.';
    }
  
    if (!formData.rollNumber) {
      errors.rollNumber = 'Roll number is required.';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.rollNumber)) {
      errors.rollNumber = 'Roll no should be alphanumeric.';
    }
  
    if (!formData.department) {
      errors.department = 'Department is required.';
    }else if (!/^[A-Za-z\s\.\-]+$/.test(formData.department)) {
        errors.department = 'Fill department according to the format.';
      }
  
    if (!formData.dob) {
      errors.dob = 'Date of Birth is required.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dob)) {
      errors.dob = 'Date of Birth must be in YYYY-MM-DD format.';
    } 
  
    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact number must be 10 digits.';
    }
  
    if (!formData.address) {
      errors.address = 'Address is required.';
    }
  
    if (!formData.institutionName) {
      errors.institutionName = 'Institution name is required.';
    }
  
    if (!formData.batch) {
      errors.batch = 'Batch is required.';
    } else if (!/^\d{4}-\d{4}$/.test(formData.batch)) {
      errors.batch = 'Batch must be in YYYY - YYYY format.';
    } else {
      const [startYear, endYear] = formData.batch.split('-').map(Number);
      if (endYear <= startYear) {
        errors.batch = 'End year must be greater than start year.';
      }
    }
    return errors;
}