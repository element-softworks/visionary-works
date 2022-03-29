import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

export default (fn: (theme: Theme) => any) => styled.div(({ theme }) => fn(theme));
