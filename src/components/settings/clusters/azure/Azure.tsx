import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
  IonToggle,
} from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { saveTemporaryCredentials } from '../../../../utils/storage';

export interface IAzureProps extends RouteComponentProps {
  close: () => void;
}

const Azure: React.FunctionComponent<IAzureProps> = ({ close, history }: IAzureProps) => {
  const [subscriptionID, setSubscriptionID] = useState<string>('');
  const [clientID, setClientID] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [tenantID, setTenantID] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubscriptionID = (event) => {
    setSubscriptionID(event.target.value);
  };

  const handleClientID = (event) => {
    setClientID(event.target.value);
  };

  const handleClientSecret = (event) => {
    setClientSecret(event.target.value);
  };

  const handleTenantID = (event) => {
    setTenantID(event.target.value);
  };

  const toggleAdmin = (event) => {
    setAdmin(event.detail.checked);
  };

  const importClusters = () => {
    if (subscriptionID === '' || clientID === '' || clientSecret === '' || tenantID === '') {
      setError('Subscription ID, Client ID, Client Secret, Tenant ID and Resource Group Name are required.');
    } else {
      saveTemporaryCredentials({
        subscriptionID: subscriptionID,
        clientID: clientID,
        clientSecret: clientSecret,
        tenantID: tenantID,
        admin: admin,
      });

      close();
      history.push('/settings/clusters/azure');
    }
  };

  return (
    <IonCard>
      <div className="card-header-image">
        <img alt="Azure" src="/assets/card-header-azure.png" />
      </div>
      <IonCardHeader>
        <IonCardTitle>Import from Microsoft Azure</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p className="paragraph-margin-bottom">
          Choose this option to import your AKS clusters from Microsoft Azure. You have to provide your Subscription ID,
          Client ID, Tenant ID, Client Secret and the name of the Resource Group. These credentials are used to retrieve
          the Kubeconfig files for your cluster. You can also choose between the user and admin configuration. For the
          creation of the Azure credentials you can use the following guide:{' '}
          <a href="https://docs.kubenav.io/mobile/microsoft-azure/" target="_blank" rel="noopener noreferrer">
            Microsoft Azure: Creating App Credentials
          </a>
          .
        </p>

        <IonList className="paragraph-margin-bottom" lines="full">
          <IonItem>
            <IonLabel position="stacked">Subscription ID</IonLabel>
            <IonInput type="text" required={true} value={subscriptionID} onInput={handleSubscriptionID} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Client ID</IonLabel>
            <IonInput type="text" required={true} value={clientID} onInput={handleClientID} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Client Secret</IonLabel>
            <IonInput type="text" required={true} value={clientSecret} onInput={handleClientSecret} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Tenant ID</IonLabel>
            <IonInput type="text" required={true} value={tenantID} onInput={handleTenantID} />
          </IonItem>
          <IonItem>
            <IonLabel>Admin Credentials</IonLabel>
            <IonToggle checked={admin} onIonChange={toggleAdmin} />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={() => importClusters()}>
          Import from Azure
        </IonButton>
      </IonCardContent>

      <IonToast isOpen={error !== ''} onDidDismiss={() => setError('')} message={error} duration={3000} />
    </IonCard>
  );
};

export default withRouter(Azure);
