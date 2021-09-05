
export const setupFilterOptions = (obj) => {
    return Object.keys(obj).map((val) => { return { value: val, label: val, checked: false } })
}
export const setBarData = (data) => {
    const result = {}
    const status = {}
    const issueType = {}
    const priority = {}
    data.forEach((res) => {
        status[res.status] =  res.status
        priority[res.priority] = res.priority 
        issueType[res.issue_type] = res.issue_type
        if(result[res.assignee]) {
            result[res.assignee].ticket_count =  result[res.assignee].ticket_count + 1
        } else {
            result[res.assignee] = res;
            result[res.assignee].ticket_count = 1;
        }
    })
    return { result, status: setupFilterOptions(status), issueType: setupFilterOptions(issueType), priority: setupFilterOptions(priority) }
}

export const getCondition = (res, statusVal, priorityVal, issueTypeVal) => {
    const condtion = {}
        if(statusVal.length !== 0)
            condtion.status =  statusVal.indexOf(res.status) !== -1
        if(priorityVal.length !== 0)
            condtion.priority =  priorityVal.indexOf(res.priority) !== -1
        if(issueTypeVal.length !== 0)
            condtion.issue_type = issueTypeVal.indexOf(res.issue_type) !== -1        
        const values = Object.values(condtion)
    return values.length > 0 ? values.every((res) => res === true): false
      
}
export const getFiltredData = (data, statusVal, priorityVal, issueTypeVal) => {
    const result = {}
    data.forEach((res) => {
        if(getCondition(res, statusVal, priorityVal, issueTypeVal) || (statusVal.length === 0 && priorityVal.length === 0 && issueTypeVal.length === 0)) {
            if(result[res.assignee]) {
                result[res.assignee].ticket_count =  result[res.assignee].ticket_count + 1
            } else {
                result[res.assignee] = res;
                result[res.assignee].ticket_count = 1;
            }
        }
    })
    return result
}

export const getValues = (arr) => {
    if(arr === null) {
        return [];
    }
    return arr.map((res) => { return res.value })
}