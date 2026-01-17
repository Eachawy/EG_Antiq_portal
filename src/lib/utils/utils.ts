export const formatDate = (year: number, tCommon: any) => {
    if (!year || year === 0) return '';
    if (year < 0) {
        return `${Math.abs(year)} ${tCommon('bc')}`;
    } else {
        return `${year} ${tCommon('ad')}`;
    }
};

export const formatDatecreatedAt = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }
};