import React from 'react';
import { render, waitFor, configure } from '@testing-library/react';
import Icon from '@mdi/react';
import colors from '../../../enums/colors';
import variants from '../../../enums/variants';
import Tag from '../Tag';
import { mdiComment } from '@mdi/js';

configure({ testIdAttribute: 'data-test-id' });

describe('Tag', () => {
  it('shows loading text when provided', async () => {
    const testId = 'tag-1';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag isLoading={true} containerProps={containerProps}>
        Shows Loading
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows Tag with non-default props variant and color', async () => {
    const testId = 'tag-2';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag
        color={colors.black}
        elevation={2}
        variant={variants.outline}
        containerProps={containerProps}
      >
        Variant and color
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows Tag with text variant', async () => {
    const testId = 'tag-3';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag variant={variants.text} containerProps={containerProps}>
        text variant
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows Tag with fill variant', async () => {
    const testId = 'tag-4';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag variant={variants.fill} containerProps={containerProps}>
        fill variant
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows Tag with outline variant', async () => {
    const testId = 'tag-5';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag variant={variants.outline} containerProps={containerProps}>
        outline variant
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows LeftIconContainer when isProcessing', async () => {
    const testId = 'tag-6';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag isProcessing containerProps={containerProps}>
        processing
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows icons with type string', async () => {
    const testId = 'tag-7';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag iconSuffix={mdiComment} iconPrefix={mdiComment} containerProps={containerProps}>
        string icon props
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('shows icons', async () => {
    const testId = 'tag-8';
    const containerProps = { 'data-test-id': testId };
    const { container, getByTestId } = render(
      <Tag
        iconSuffix={<Icon path={mdiComment} />}
        iconPrefix={<Icon path={mdiComment} />}
        containerProps={containerProps}
      >
        shows icons
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    expect(container).toMatchSnapshot();
  });

  it('keeps the container the same when switching between isLoading and not isLoading', async () => {
    const testId = 'tag-9';
    const containerProps = { 'data-test-id': testId };
    const { getByTestId, rerender, asFragment } = render(
      <Tag isLoading={true} containerProps={containerProps}>
        Hello World!
      </Tag>,
    );

    await waitFor(() => getByTestId(testId));
    const loadingFragment = asFragment();

    rerender(<Tag containerProps={containerProps}>Hello World!</Tag>);
    await waitFor(() => getByTestId(testId));
    const loadedFragment = asFragment();

    // TODO: Use toMatchDiffSnapshot() between the fragments once we can figure out
    // how to make it use the jest-styled-components plugin
    expect(loadingFragment.firstChild).toMatchSnapshot();
    expect(loadedFragment.firstChild).toMatchSnapshot();
  });
});
