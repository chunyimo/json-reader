export function safeParse(params:any) {
    try {
        const res = JSON.parse(params);
        return res;
    } catch (error) {
        return params;
    }
}