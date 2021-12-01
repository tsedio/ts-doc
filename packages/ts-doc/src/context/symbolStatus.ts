import {context} from "./context";

/**
 *
 * @returns {Array}
 */
export function symbolStatus() {
  const list: any = [];
  Object.keys(context.status).forEach((k) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    list.push(context.status[k]);
  });

  return list;
}
