import React from 'react';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
function Drop() {
    return (
        <CDropdown>
            <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem >Action</CDropdownItem>
                <CDropdownItem >Another action</CDropdownItem>
                <CDropdownItem >Something else here</CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
};
export default Drop;