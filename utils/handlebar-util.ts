function getFormattedDay(date: Date) {
    return date.getDate().toString().padStart(2, '0');
}

function getFormattedMonth(date: Date) {
    return (date.getMonth() + 1).toString().padStart(2, '0');
}

export const helpers = {
    'if_eq': function (a: any, b: any, opts: any) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    'generateStarIcons': function (importance: number) {
        const maxStars = 5;
        let starIcons = '';

        for (let i = 1; i <= maxStars; i++) {
            if (i <= importance) {
                starIcons += '<i class="bi bi-star-fill text-warning"></i>'; // Yellow star
            } else {
                starIcons += '<i class="bi bi-star text-secondary"></i>'; // Greyed out star
            }
        }
        return starIcons;
    },
    'switch': function (value: any, options: any) {
        (this as any).switch_value = value;
        return options.fn(this);
    },
    'case': function (value: any, options: any) {
        if (value === (this as any).switch_value) {
            return options.fn(this);
        }
    },
    'formatDateForInput': function (date: Date) {
        const formattedDate = new Date(date);
        const day = getFormattedDay(formattedDate);
        const month = getFormattedMonth(formattedDate)
        const year = formattedDate.getFullYear();

        return `${year}-${month}-${day}`;
    },
    'formatDateForView': function (date: Date) {
        const formattedDate = new Date(date);
        const day = getFormattedDay(formattedDate);
        const month = getFormattedMonth(formattedDate);
        const year = formattedDate.getFullYear();

        return `${day}.${month}.${year}`;
    }
}