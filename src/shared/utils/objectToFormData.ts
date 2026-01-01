export const objectToFormData = (obj: any, formData = new FormData(), parentKey = ''): FormData => {
    if (obj === null || obj === undefined) {
        return formData;
    }

    if (typeof obj !== 'object' || obj instanceof File) {
        if (parentKey) {
            let value: any = obj;
            if (typeof value === 'boolean') {
                value = value ? '1' : '0';
            }
            if (typeof value === 'number') {
                value = String(value);
            }
            formData.append(parentKey, value as string | Blob);
        }
    } else if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
            objectToFormData(item, formData, `${parentKey}[${index}]`);
        });
    } else {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value === null || value === undefined) {
                return;
            }
            const newKey = parentKey ? `${parentKey}[${key}]` : key;
            objectToFormData(value, formData, newKey);
        });
    }

    return formData;
};