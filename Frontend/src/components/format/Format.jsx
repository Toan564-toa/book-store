export const formatVND = (value) =>  {
    return value ? `${Number(value).toLocaleString("vi-VN")} ₫` : ""
};

export const parseVND = (value) =>  {
    return value ? Number(value.replace(/[^\d]/g, "")) : 0
};