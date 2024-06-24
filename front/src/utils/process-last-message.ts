function truncate(str: string, n: number): string {
  return str.length > n ? `${str.slice(0, n - 1)}...` : str;
}

const processLastMessage = (lastMessage: string | undefined): string => {
  if (!lastMessage) return '';

  return truncate(lastMessage, 20);
};

const processLastMessageTimestamp = (timestamp: Date | undefined): string => {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false
  };

  const formattedDate = date.toLocaleString('en-US', options);

  const [weekday, time] = formattedDate.split(', ');

  return `${weekday}, ${time}`;
};

export { processLastMessage, processLastMessageTimestamp };
