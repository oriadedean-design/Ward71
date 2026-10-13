import { useCallback, useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { Box, Button, Card, Flex, Heading, Stack, Text } from '@sanity/ui';
import { DownloadIcon, EditIcon } from '@sanity/icons';

// Studio tool: petition signature count and CSV downloads. Runs in the
// logged-in editor's browser with their own Studio session, so there's no
// public download address for anyone else to find.

interface Signature {
  fullName?: string;
  email?: string;
  comment?: string;
  anonymousQuote?: boolean;
  petitionUpdates?: boolean;
  communityProjects?: boolean;
  campaignUpdates?: boolean;
  signedAt?: string;
  status?: string;
  networkHash?: string;
}

const QUERY = `*[_type == "petitionSignature"] | order(signedAt asc){
  fullName, email, comment, anonymousQuote, petitionUpdates, communityProjects, campaignUpdates, signedAt, status, networkHash
}`;

const toronto = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('en-CA', { timeZone: 'America/Toronto', dateStyle: 'medium', timeStyle: 'short' }) : '';

// Quotes every cell, and stops spreadsheet apps from running a cell that
// starts with = + - @ as a formula.
function csvCell(value: unknown): string {
  let text = value === undefined || value === null ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function download(filename: string, rows: unknown[][]) {
  // The byte-order mark makes Excel read accented names correctly.
  const csv = '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

const yesNo = (v?: boolean) => (v ? 'Yes' : 'No');
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });

function PetitionExport() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [signatures, setSignatures] = useState<Signature[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    () =>
      client.fetch<Signature[]>(QUERY).then(
        (rows) => {
          setError(null);
          setSignatures(rows);
        },
        (e) => setError(String(e?.message ?? e))
      ),
    [client]
  );

  useEffect(() => {
    load();
  }, [load]);

  const counted = (signatures ?? []).filter((s) => s.status !== 'Removed');

  // For the TTC: names and dates only. Emails, comments and choices stay private.
  const downloadForTtc = () =>
    download(`TTC petition signatures ${today()}.csv`, [
      ['No.', 'Full name', 'Date signed (Toronto time)'],
      ...counted.map((s, i) => [i + 1, s.fullName, toronto(s.signedAt)]),
    ]);

  // Everything, for the campaign team only.
  const downloadFull = () =>
    download(`Petition signatures FULL PRIVATE ${today()}.csv`, [
      ['Full name', 'Signed (Toronto time)', 'Status', 'Email', 'Comment', 'OK to quote anonymously', 'Petition updates', 'Community projects', 'Campaign updates', 'Connection fingerprint'],
      ...(signatures ?? []).map((s) => [
        s.fullName,
        toronto(s.signedAt),
        s.status ?? 'Counted',
        s.email,
        s.comment,
        yesNo(s.anonymousQuote),
        yesNo(s.petitionUpdates),
        yesNo(s.communityProjects),
        yesNo(s.campaignUpdates),
        s.networkHash,
      ]),
    ]);

  return (
    <Box padding={5} style={{ maxWidth: 720 }}>
      <Stack space={5}>
        <Heading size={3}>TTC Finch West Petition</Heading>
        {error && (
          <Card padding={3} tone="critical" radius={2}>
            <Text>Couldn&apos;t load signatures: {error}</Text>
          </Card>
        )}
        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Text size={4} weight="bold">{signatures ? counted.length.toLocaleString('en-CA') : '…'}</Text>
            <Text muted>
              signatures counted
              {signatures && signatures.length > counted.length ? ` (${signatures.length - counted.length} removed)` : ''}
            </Text>
          </Stack>
        </Card>
        <Stack space={3}>
          <Button icon={DownloadIcon} text="Download for the TTC (CSV)" tone="primary" disabled={!signatures} onClick={downloadForTtc} />
          <Text size={1} muted>
            Numbered list of names and signing dates, for printing and submitting. Removed signatures are left out. No emails or comments.
          </Text>
        </Stack>
        <Stack space={3}>
          <Button icon={DownloadIcon} text="Download full list (CSV, private)" mode="ghost" disabled={!signatures} onClick={downloadFull} />
          <Text size={1} muted>
            Every signature with emails, comments and update choices. For the campaign team only. Never send this file to the TTC.
          </Text>
        </Stack>
        <Flex>
          <Button text="Refresh" mode="bleed" onClick={load} />
        </Flex>
        <Text size={1} muted>
          To take out a duplicate or fake signature, open it under Inbox → Petition Signatures and set its status to “Removed”.
        </Text>
      </Stack>
    </Box>
  );
}

export const petitionTool = {
  name: 'petition',
  title: 'Petition',
  icon: EditIcon,
  component: PetitionExport,
};
