export interface ipinfo {
    ip?: any,
    city?: any,
    region?: any,
    country?: any,
    loc?: any,
    org?: any,
    postal?: any,
    timezone?: any
}

export interface geocoding {
    results?: any,
    status?: any
}

export interface autosuggest {
    _links?: any,
    _embedded?: any
}

export interface eventsearch {
    _links?: any,
    _embedded?: any,
    page?: any
}

export interface eventdetails {
    _links?: any,
    _embedded?: any,
    ticketing?: any,
    ageRestrictions?: any,
    accessibility?: any,
    seatmap?: any,
    products?: any,
    priceRanges?: any,
    promoters?: any,
    promoter?: any,
    classifications?: any,
    dates?: any,
    sales?: any,
    images?: any,
    pleaseNote?: any,
    locale?: any,
    url?: any,
    test?: any,
    id?: any,
    type?: any,
    name?: any
}

export interface venuedetails {
    _links?: any,
    _embedded?: any,
    page?: any
}

export interface artistdetails {
    artists?: any
}