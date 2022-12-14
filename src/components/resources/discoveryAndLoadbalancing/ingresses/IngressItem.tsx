import { IonItem, IonLabel } from '@ionic/react';
import { V1Ingress, V1IngressRule } from '@kubernetes/client-node';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { timeDifference } from '../../../../utils/helpers';

const getHosts = (rules: V1IngressRule[]): string[] => {
  const hosts: string[] = [];

  for (const rule of rules) {
    if (rule.host) {
      hosts.push(rule.host);
    }
  }

  return hosts;
};

interface IIngressItemProps extends RouteComponentProps {
  item: V1Ingress;
  section: string;
  type: string;
}

const IngressItem: React.FunctionComponent<IIngressItemProps> = ({ item, section, type }: IIngressItemProps) => {
  // - Hosts: List of fully qualified domain names.
  // - Age: The time when the ingress was created.
  return (
    <IonItem
      routerLink={`/resources/${section}/${type}/${item.metadata ? item.metadata.namespace : ''}/${
        item.metadata ? item.metadata.name : ''
      }`}
      routerDirection="forward"
    >
      <IonLabel>
        <h2>{item.metadata ? item.metadata.name : ''}</h2>
        <p>
          Hosts: {item.spec && item.spec.rules ? getHosts(item.spec.rules).join(', ') : '-'}
          {item.metadata && item.metadata.creationTimestamp
            ? ` | Age: ${timeDifference(
                new Date().getTime(),
                new Date(item.metadata.creationTimestamp.toString()).getTime(),
              )}`
            : ''}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default IngressItem;
