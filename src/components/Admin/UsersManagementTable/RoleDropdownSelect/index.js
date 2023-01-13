import React, { useState } from 'react';
import DropdownSelect from 'components/Common/DropdownSelect';

export default function RoleDropdownSelect({ value, options, onChange }) {
  const [selectedRole, setSelectedRole] = useState(value);
  const handleChange = (newRole) => {
    onChange(newRole, () => {
      setSelectedRole(newRole);
    })
  }
  return (
    <DropdownSelect
      value={selectedRole}
      options={options}
      onChange={handleChange}
    />
  )
}
