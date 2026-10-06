const ELECTIONS_URL = 'https://www.toronto.ca/city-government/elections/';
const ELECTIONS_LINK_TEXT = 'toronto.ca/elections';

/** Renders text, turning every "toronto.ca/elections" into a link. */
export function Linkified({
  text,
  linkClassName = 'text-accent underline underline-offset-2 hover:opacity-80',
}: {
  text: string;
  linkClassName?: string;
}) {
  const parts = text.split(ELECTIONS_LINK_TEXT);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={ELECTIONS_URL} className={linkClassName} target="_blank" rel="noopener noreferrer">
              {ELECTIONS_LINK_TEXT}
            </a>
          )}
        </span>
      ))}
    </>
  );
}
